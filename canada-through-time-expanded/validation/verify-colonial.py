"""Geographic outcome checks for the generalized classroom reconstruction."""
from pathlib import Path
import gzip,json
from shapely.geometry import shape,Point
from shapely.ops import unary_union

root=Path(__file__).resolve().parents[1]
bundle=json.loads(gzip.decompress((root/'data/colonial-boundaries.json.gz').read_bytes()))
def expand(indexes):
 return bundle['coordinate_pool'][indexes] if isinstance(indexes,int) else [expand(i) for i in indexes]
maps={}
for year,view in bundle['maps'].items():
 maps[int(year)]={}
 for feature in view['features']:
  geometry=shape({'type':feature['geometry']['type'],'coordinates':expand(feature['geometry']['coordinate_indexes'])})
  assert geometry.is_valid and not geometry.is_empty,(year,feature['properties']['name'],'invalid geometry')
  assert geometry.bounds[0]>=-180 and geometry.bounds[2]<=180,(year,'invalid coordinates')
  maps[int(year)][feature['properties']['name']]=geometry
 print('PASS valid exported geometries',year)
q1763=maps[1763]['Province of Quebec']
q1774=maps[1774]['Expanded Province of Quebec']
assert q1763.covers(Point(-71.22,46.82)), 'Quebec City missing in 1763'
assert not q1763.covers(Point(-83.04,42.33)), '1763 Quebec incorrectly includes Detroit'
assert q1774.covers(Point(-83.04,42.33)), '1774 Quebec missing Detroit'
assert q1774.bounds[1]<39.5 and q1774.area>q1763.area*3,'1774 Ohio/Great Lakes expansion missing'
print('PASS 1763 Quebec is smaller; 1774 includes the Great Lakes and Ohio Valley')
upper=maps[1791]['Upper Canada'];lower=maps[1791]['Lower Canada']
assert upper.covers(Point(-79.4,43.7)), 'Upper Canada missing Toronto'
assert lower.covers(Point(-71.22,46.82)), 'Lower Canada missing Quebec City'
assert upper.intersection(lower).area<.005,'Upper and Lower Canada overlap substantially'
union=maps[1840]['Province of Canada']
assert union.covers(Point(-79.4,43.7)) and union.covers(Point(-71.22,46.82)),'Union missing either section'
print('PASS 1791 split and 1841 union include their key communities')
oregon=maps[1840]['Oregon country · joint occupation']
assert oregon.bounds[1]<43 and oregon.bounds[3]>54,'Oregon uses later 49th-parallel split'
assert oregon.covers(Point(-123.1,49.25)), 'Oregon missing future Vancouver region'
assert 'Northeastern frontier · disputed' in maps[1840], '1842 frontier shown as settled in 1841'
print('PASS 1841 Oregon joint occupation and northeastern frontier are unresolved')
for year in [1763,1774,1791,1840]:
 assert maps[year]['Saint-Pierre and Miquelon'].geom_type=='Point','Missing French island location'
print('PASS French island location is retained after 1763')
print('ALL GEOGRAPHIC OUTCOME CHECKS PASSED')
