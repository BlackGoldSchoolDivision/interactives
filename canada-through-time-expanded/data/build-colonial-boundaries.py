"""Build generalized classroom colonial regions on the app's geographic base.

These are authored reconstructions, not an NRCan pre-1867 vector dataset.
Historical extents use the Atlas fourth-edition panels and the legal/geographic
references listed below. Later NRCan geometry supplies generalized coastlines
and reference shapes; reusing a shape does not assert that its later boundary
was already surveyed or agreed at the earlier date. Requires shapely >= 2.
"""
from pathlib import Path
import gzip, json, hashlib
from shapely.geometry import shape, mapping, Polygon, box
from shapely.ops import unary_union
from shapely import make_valid, set_precision

ROOT = Path(__file__).resolve().parent
ATLAS = 'https://open.canada.ca/data/en/dataset/ae607339-800b-50d7-8d1e-4309d17d10c3'
PROCLAMATION = 'https://www.cirnac.gc.ca/eng/1370355181092/1607905122267'
HERITAGE = 'https://www.canada.ca/en/canadian-heritage/services/historical-boundaries-canada.html'
OREGON = 'https://www.pc.gc.ca/apps/dfhd/page_nhs_eng.aspx?id=924'
QUEBEC = 'https://www.paricilademocratie.com/approfondir/territoire-et-constitutions/4934-repertoire-des-cartes'
NOTE = 'Generalized classroom reconstruction of colonial claims and administrative regions. Inland lines and disputed limits are approximate; modern geographic coastlines are used. These are not legal surveys or Indigenous territorial boundaries.'
bundle = json.loads(gzip.decompress((ROOT/'historical-boundaries.geojson.gz').read_bytes()))

def clean(g):
    g = make_valid(g)
    if g.geom_type == 'GeometryCollection':
        g = unary_union([p for p in g.geoms if p.geom_type in ('Polygon','MultiPolygon')])
    return g

def reference(year, name):
    view = next(v for v in bundle['regionViews'] if v['year'] == year and v['name'] == name)
    return clean(unary_union([shape(bundle['features'][i]['geometry']) for i in view['polygon_ids']]))

latest = [reference(2003,v['name']) for v in bundle['regionViews'] if v['year']==2003]
canada = clean(unary_union(latest))
mainland = max(canada.geoms, key=lambda g:g.area) if canada.geom_type=='MultiPolygon' else canada
context = json.loads((ROOT/'context.geojson').read_text())
usa = clean(shape(next(f for f in context['features'] if f['properties']['name']=='United States of America')['geometry']))
# Only the geographic mainland context; Alaska is shown in neutral context.
land = clean(unary_union([canada,usa.intersection(box(-141,28,-50,84))])).buffer(.003,quad_segs=2).buffer(-.003,quad_segs=2)
refs = {v['name']:reference(1867,v['name']) for v in bundle['regionViews'] if v['year']==1867}
ontario, quebec = refs['Ontario'], refs['Quebec']
nb, ns, pei = refs['New Brunswick'], refs['Nova Scotia'], refs['Prince Edward Island']
newfoundland_island = refs['Newfoundland'].intersection(box(-60,46,-50,52))
labrador = refs['Newfoundland'].difference(newfoundland_island)
# Mainland Labrador's inland division was not settled in the eighteenth century.
labrador_coast = labrador.intersection(Polygon([(-66,50),(-59,50),(-57,54),(-59,60.5),(-64,60.5),(-62,55),(-66,50)]))
maritimes = clean(unary_union([nb,ns,pei]))
cape_breton = ns.intersection(box(-61.6,45.4,-59,47.5))
french_islands = clean(unary_union([cape_breton,pei]))
# The 1818 49th-parallel cut in the 1867 reference must not appear as an
# established seventeenth/eighteenth-century border. Include the generalized
# southern Hudson drainage into today's northern United States.
rupert_south = Polygon([(-117,49.2),(-113.8,47.8),(-109,48.2),(-104,48.4),(-100,45.8),(-95,45.6),(-92,47.2),(-89,48.1),(-90,51),(-113,54),(-117,49.2)]).intersection(land)
rupert = clean(unary_union([refs["Rupert's Land"],rupert_south])).buffer(.003,quad_segs=2).buffer(-.003,quad_segs=2)
# Schematic Atlantic-draining / interior divide, following the small-scale Atlas.
coast_colonies = Polygon([(-81.5,30),(-79.2,35),(-77.7,38),(-76,40.3),(-74.3,42),(-72.5,43.7),(-70.5,45),(-66,45),(-50,45),(-50,28),(-81.5,28),(-81.5,30)]).intersection(land)
# Generalized Great Lakes/St. Lawrence French claims; southern claims follow
# the Atlas panel, without treating the colonial colouring as actual occupation.
new_france = Polygon([(-99,36),(-94,46),(-91,49),(-87,50),(-82,51.5),(-75,53.5),(-67,55),(-57,54),(-55,48),(-63,44),(-68,43),(-73,41),(-77,38),(-82,34),(-90,34),(-99,36)]).intersection(land).difference(coast_colonies)
# The Hudson drainage's disputed southern/eastern belt is deliberately hatched.
hudson_dispute = Polygon([(-96,49),(-88,50),(-80,52),(-74,54),(-66,55),(-59,58),(-59,60),(-66,57),(-75,56),(-84,54),(-92,52),(-96,49)]).intersection(land)
acadia_dispute = nb
# Royal Proclamation: St John River -> Lake St John -> south Lake Nipissing;
# 45th parallel and the watershed/highlands -> Chaleur Bay -> Gulf coast.
q1763 = Polygon([(-64.4,50.3),(-65.5,51.0),(-72.2,48.6),(-79.4,46.2),(-79.2,45),(-74.5,45),(-71.5,45.4),(-69.2,47.2),(-67.2,47.3),(-64.8,48.1),(-63.8,49.2),(-64.4,50.3)]).intersection(land)
# Quebec Act reaches the Mississippi and Ohio, beyond present-day Canada.
ohio_extension = Polygon([(-90.9,46.8),(-92,45),(-92,42),(-90.2,38.8),(-89.2,37),(-88,37),(-86,38),(-84,39.1),(-82.8,38.4),(-80.5,40),(-80.5,42),(-78,45),(-82,49),(-90.9,46.8)]).intersection(land)
q1774 = clean(unary_union([ontario,quebec,labrador_coast,ohio_extension])).difference(maritimes)
reserved_interior = Polygon([(-97,29),(-97,50),(-82,53),(-68,55),(-60,53),(-63,46),(-71,43),(-75,40),(-79,35),(-82,30),(-97,29)]).intersection(land)
# Before 1846, Oregon is jointly occupied, not divided at today's 49th parallel.
oregon = Polygon([(-132,42),(-120,42),(-116,45),(-114.5,49),(-119,54.6667),(-133,54.6667),(-132,42)]).intersection(land)
# The northeastern boundary remains disputed until the 1842 settlement.
maine_dispute = Polygon([(-71.5,45.2),(-69.1,47.5),(-67.8,47.4),(-67.7,45.9),(-69,45.4),(-71.5,45.2)]).intersection(land)

palette={'French':'#83a9d7','British':'#df9095','British-admin':'#c8717f','United States':'#d8b96f','Indigenous':'#afc5bc','Context':'#d4dfe5','Disputed':'#ccb985'}
maps={}

def build(year, regions):
    occupied = Polygon()
    features=[]
    for name,geom,owner,label,note,*rest in regions:
        geom=clean(geom.intersection(land).difference(occupied))
        if geom.is_empty: continue
        occupied=clean(unary_union([occupied,geom]))
        geom=clean(geom.simplify(.025,preserve_topology=True))
        props={'name':name,'kind':'Disputed colonial claims' if owner=='Disputed' else 'Indigenous lands' if owner=='Indigenous' else 'Geographic context' if owner=='Context' else 'Colonial region' if owner.startswith('British') else 'French colonial claim' if owner=='French' else 'Neighbouring country',
               'controller':owner,'colour':palette[owner],'label':label,'note':note,'in_canada':False,'approximate':True,'source':ATLAS,'shape_key':hashlib.sha1(geom.wkb).hexdigest(),'area_km2':geom.area*7000}
        if owner=='Disputed':props['pattern']='colonial-dispute'
        features.append({'type':'Feature','id':f'{year}-{len(features)}','properties':props,'geometry':mapping(geom)})
    # One border-free neutral region shows the rest of the land. It does not
    # imply a single Indigenous nation or a European country with that border.
    neutral=clean(land.difference(occupied).simplify(.025,preserve_topology=True))
    features.append({'type':'Feature','id':f'{year}-context','properties':{'name':'Indigenous homelands · geographic context','kind':'Geographic context','controller':'Context','colour':palette['Context'],'label':[-124,65],'in_canada':False,'context':True,'note':'Indigenous nations live and govern throughout all the land on this map, including the coloured colonial claims. The neutral area is geographic context, not a single territory, an empty land, or an agreed colonial boundary.','shape_key':hashlib.sha1(neutral.wkb).hexdigest()},'geometry':mapping(neutral)})
    maps[str(year)]={'type':'FeatureCollection','name':f'Generalized colonial map {year}','attribution':NOTE,'sources':[ATLAS,PROCLAMATION,HERITAGE,OREGON,QUEBEC],'features':features}

build(1667,[
 ('Acadia',maritimes,'French',[-64.9,46.4],'Acadia is a French colonial claim in this teaching view. English and French powers repeatedly contest control, while Mi’kmaq and other First Nations continue to live and govern here.'),
 ('Newfoundland · disputed claims',newfoundland_island,'Disputed',[-55.5,49.3],'English and French fishing settlements and claims coexist around Newfoundland. This generalized view marks the island as contested rather than assigning a precise settled inland frontier.'),
 ('Hudson Bay · disputed claims',hudson_dispute,'Disputed',[-78,53],'French and English claims around Hudson Bay remain contested. The Hudson’s Bay Company is chartered later, in 1670; its later Rupert’s Land grant is not shown as an established colony in 1667.'),
 ('New France',new_france,'French',[-77.5,48.2],'French colonial claims link the St. Lawrence, Great Lakes and inland river routes. The broad colouring follows the Atlas’s small-scale interpretation; it does not mean French settlement or control throughout Indigenous homelands.'),
 ('English Atlantic colonies',coast_colonies,'British',[-73,40],'English colonies occupy parts of the Atlantic coast. The inland limit is a generalized colonial claim, not an exact surveyed boundary.')])
build(1713,[
 ('Île Royale and Île Saint-Jean',french_islands,'French',[-61.9,47.5],'France retains Île Royale (Cape Breton) and Île Saint-Jean (Prince Edward Island) after Utrecht.'),
 ('Nova Scotia / Acadia',ns.difference(cape_breton),'British-admin',[-64.3,44.6],'France cedes Acadia in the Treaty of Utrecht. This solid-colour peninsula is the clearest part of the British claim; the mainland limits remain disputed.'),
 ('Acadia · disputed mainland',acadia_dispute,'Disputed',[-66.5,46.5],'Britain and France interpret Acadia’s extent differently. The hatched area is a schematic disputed mainland zone, not a settled boundary or a transfer accepted by First Nations.'),
 ('Newfoundland',newfoundland_island,'British',[-55.5,49.3],'The treaty recognizes British control of Newfoundland while France retains specified fishing rights.'),
 ('Hudson Bay · disputed limits',hudson_dispute,'Disputed',[-78,53],'Utrecht recognizes British rights in the Hudson Bay region, but the limits between Rupert’s Land and New France remain disputed. Hatching represents that uncertainty.'),
 ('New France',new_france,'French',[-76.8,48.2],'France retains Canada in New France and its inland river connections. This is a generalized claim area based on the Atlas, not a map of complete occupation.'),
 ('Rupert’s Land · HBC claim',rupert,'British',[-99,56],'The Hudson’s Bay Company claims the Hudson Bay drainage under its 1670 charter. Utrecht restores British rights in the region. The outer watershed extent is generalized from a later geographic reference; early limits were not all agreed.'),
 ('British Atlantic colonies',coast_colonies,'British',[-73,40],'British colonies continue along the Atlantic seaboard south of Acadia.')])
build(1763,[
 ('Province of Quebec',q1763,'British-admin',[-72.5,47.2],'The Royal Proclamation creates a smaller colony around the St. Lawrence. Its generalized boundary follows the named river, lakes, 45th parallel and watershed in the Proclamation; it is much smaller than modern Quebec.'),
 ('Newfoundland and Labrador coast',unary_union([newfoundland_island,labrador_coast]),'British',[-57,53.5],'The Proclamation places the Labrador coast and nearby islands under Newfoundland’s administration. The inland width of the coastal band is schematic; the later 1927 Labrador boundary is not asserted here.'),
 ('Nova Scotia and Gulf islands',maritimes,'British',[-64.7,45.4],'Nova Scotia includes what later becomes New Brunswick. Cape Breton and Île Saint-Jean are attached at this stage.'),
 ('Rupert’s Land · HBC claim',rupert,'British',[-99,56],'The Hudson’s Bay Company claims the Hudson Bay drainage. Its colonial grant does not erase Indigenous occupation, governments or rights; this watershed outline is generalized.'),
 ('British Atlantic colonies',coast_colonies,'British',[-73,40],'Britain retains its Atlantic colonies. Inland colonial settlement is restricted by the Royal Proclamation.'),
 ('Lands reserved under the Proclamation',reserved_interior,'Indigenous',[-85,44],'The Crown restricts settlement and private land purchases beyond the colonies. First Nations already live and govern here. This shaded interior is a generalized teaching region, not one Indigenous nation or a comprehensive map of Indigenous rights.')])
build(1774,[
 ('Expanded Province of Quebec',q1774,'British-admin',[-77,49],'The Quebec Act expands the colony into the Great Lakes and Ohio Valley and attaches Labrador and Gulf islands. Its broad western and northern limits are generalized. First Nations’ rights and governments continue throughout these claimed lands.'),
 ('Newfoundland',newfoundland_island,'British',[-55.5,49.3],'Newfoundland remains separate; Labrador’s administration is transferred to Quebec under the Act.'),
 ('Nova Scotia',unary_union([nb,ns]),'British',[-65,45.4],'Nova Scotia includes mainland territory later separated as New Brunswick. Cape Breton is part of Nova Scotia at this date.'),
 ('Island of St. John',pei,'British',[-62.7,47.5],'The island becomes a separate British colony in 1769. It is renamed Prince Edward Island in 1798.'),
 ('Rupert’s Land · HBC claim',rupert,'British',[-99,56],'The expanded Quebec colony meets lands claimed by the Hudson’s Bay Company. The watershed limit is generalized, not an exact surveyed line.'),
 ('British Atlantic colonies',coast_colonies,'British',[-73,40],'The thirteen Atlantic colonies are still British in 1774, before the American Declaration of Independence.'),
 ('Lands outside colonial settlement',reserved_interior,'Indigenous',[-88,36],'Indigenous nations continue to occupy and govern the interior. The Royal Proclamation’s restrictions remain significant beyond the expanded Quebec colony.')])
build(1791,[
 ('Upper Canada',ontario,'British-admin',[-81.2,47],'The Constitutional Act divides Quebec into Upper and Lower Canada. Upper Canada lies upstream along the Great Lakes. Its outer extent is generalized using the later Atlas reference; it is not modern Ontario.'),
 ('Lower Canada',unary_union([quebec,labrador_coast]),'British',[-69.7,50],'Lower Canada lies downstream along the St. Lawrence and has a Francophone majority. The Ottawa River helps divide the two colonies. Labrador is attached at this date; it returns to Newfoundland in 1809.'),
 ('New Brunswick',nb,'British',[-66.3,46.2],'New Brunswick becomes a separate British colony in 1784. Its southwestern frontier remains disputed; the modern reference line is generalized here.'),
 ('Nova Scotia',ns.difference(cape_breton),'British',[-64.3,44.5],'Nova Scotia remains separate from Upper and Lower Canada.'),
 ('Cape Breton',cape_breton,'British',[-59.9,47.2],'Cape Breton is a separate British colony from 1784 until it is reunited with Nova Scotia in 1820.'),
 ('Island of St. John',pei,'British',[-62.7,47.5],'A separate British colony, renamed Prince Edward Island in 1798.'),
 ('Newfoundland',newfoundland_island,'British',[-55.5,49.3],'Newfoundland remains a separate British colony; the Labrador coast is attached to Lower Canada at this date.'),
 ('Rupert’s Land · HBC claim',rupert,'British',[-99,56],'The HBC claims the Hudson Bay drainage. The northern/western outlines are generalized geographic references.'),
 ('United States',usa.intersection(box(-97,28,-50,50)).difference(maine_dispute),'United States',[-84,40],'The 1783 peace recognizes the United States and removes the area south of the Great Lakes from the British colonies. Some northeastern frontier claims remain disputed.')])
build(1840,[
 ('Province of Canada',unary_union([ontario,quebec]),'British-admin',[-77.5,48.5],'The Act of Union is passed in 1840 and takes effect on February 10, 1841. Former Upper and Lower Canada become Canada West and Canada East within one Province of Canada. This generalized union outline does not use the later 1849 western map.'),
 ('Oregon country · joint occupation',oregon,'Disputed',[-124.5,50],'Britain and the United States jointly occupy the Oregon country between 42°N and 54°40′N. The 49th-parallel boundary west of the Rockies is established in 1846, after this date. Vancouver Island is not yet a separate colony.'),
 ('Northeastern frontier · disputed',maine_dispute,'Disputed',[-69,46.5],'British and American claims in the Maine–New Brunswick frontier are unresolved. The Webster–Ashburton Treaty settles this frontier in 1842. This hatched zone is schematic.'),
 ('New Brunswick',nb,'British',[-66.3,46.2],'A separate British colony, outside the united Province of Canada. Its northeastern frontier is still contested in 1841.'),
 ('Nova Scotia',ns,'British',[-63.9,44.9],'A separate British colony, including Cape Breton, which is reunited with Nova Scotia in 1820.'),
 ('Prince Edward Island',pei,'British',[-62.7,47.5],'A separate British colony, outside the Province of Canada.'),
 ('Newfoundland and Labrador coast',unary_union([newfoundland_island,labrador_coast]),'British',[-57,53.5],'Newfoundland remains separate from the Province of Canada. Labrador’s coast returns to its administration in 1809. The later inland Labrador boundary is only a generalized geographic reference here.'),
 ('Rupert’s Land · HBC claim',refs["Rupert's Land"].buffer(.003,quad_segs=2).buffer(-.003,quad_segs=2),'British',[-99,56],'The Hudson’s Bay Company claims the Hudson Bay drainage. The 1818 agreement has established the 49th parallel east of the Rockies; this region has not yet joined Canada.'),
 ('North-Western Territory / New Caledonia',unary_union([refs['North-Western Territory'],refs['British Columbia']]).buffer(.003,quad_segs=2).buffer(-.003,quad_segs=2).intersection(mainland),'British',[-123,60],'British fur-trade claims extend west and northwest of Rupert’s Land. New Caledonia is a fur-trade district, not yet the colony of British Columbia. The broad outlines are approximate; the Arctic islands are not asserted as British possessions at this date.'),
 ('United States',usa.intersection(box(-125,28,-50,50)),'United States',[-100,40],'The United States is separate from the British colonies. Its western outline in this view is geographic context, not a complete map of all 1841 American claims.')])
for year in [1763,1774,1791,1840]:
 maps[str(year)]['features'].append({'type':'Feature','id':f'{year}-st-pierre','properties':{'name':'Saint-Pierre and Miquelon','kind':'French islands','controller':'French','colour':palette['French'],'label':[-56.25,46.85],'note':'France retains these small islands near Newfoundland under the 1763 Treaty of Paris. A selectable location marker is used because the islands are too small for this map’s generalized coastline.','in_canada':False,'point_reference':True},'geometry':{'type':'Point','coordinates':[-56.25,46.85]}})
label_offsets={'Île Royale and Île Saint-Jean':[83,7],'Nova Scotia / Acadia':[65,50],'Acadia · disputed mainland':[15,-34],'Newfoundland':[34,-30],'Newfoundland · disputed claims':[34,-30],'Newfoundland and Labrador coast':[48,-7],'Island of St. John':[75,-8],'Cape Breton':[65,8],'New Brunswick':[30,18]}
for view in maps.values():
 for feature in view['features']:
  if feature['properties']['name'] in label_offsets:
   feature['properties']['label_offset']=label_offsets[feature['properties']['name']]
result={'type':'ColonialClassroomMaps','precision':'generalized educational reconstruction','attribution':NOTE,'maps':maps}
def rounded(value):
 if isinstance(value,float): return round(value,3)
 if isinstance(value,(list,tuple)): return [rounded(v) for v in value]
 if isinstance(value,dict): return {k:rounded(v) for k,v in value.items()}
 return value
result=rounded(result)
# Quantization can collapse tiny islets or cross narrow rings; repair the
# snapped geometry so exported classroom GeoJSON remains valid.
for view in result['maps'].values():
 for feature in view['features']:
  geom=clean(set_precision(clean(shape(feature['geometry'])),.001))
  feature['geometry']=rounded(mapping(geom))
coordinate_pool=[]; coordinate_ids={}
def index_coordinates(value):
 if value and isinstance(value[0],(int,float)):
  key=tuple(value)
  if key not in coordinate_ids:
   coordinate_ids[key]=len(coordinate_pool);coordinate_pool.append(value)
  return coordinate_ids[key]
 return [index_coordinates(v) for v in value]
for view in result['maps'].values():
 for feature in view['features']:
  geometry=feature['geometry']
  geometry['coordinate_indexes']=index_coordinates(geometry.pop('coordinates'))
result['coordinate_pool']=coordinate_pool
result['storage']='Coordinate pool indexes are expanded by the app into ordinary downloadable GeoJSON.'
text=json.dumps(result,ensure_ascii=False,separators=(',',':'))
(ROOT/'colonial-boundaries.json.gz').write_bytes(gzip.compress(text.encode(),mtime=0))
records={'licence':'Classroom adaptation of Open Government Licence – Canada map data and public-domain geographic context','method':NOTE,'build_script':'build-colonial-boundaries.py','primary_sources':[ATLAS,PROCLAMATION,HERITAGE,OREGON,QUEBEC],'notes':['Colonial extent masks are authored generalized interpretations, not a government pre-1867 GeoJSON dataset.','Coastline/reference polygons use the app’s existing simplified Atlas 1867/2003 and Natural Earth data.','Hudson drainage extents are generalized from the later Rupert’s Land reference; early disputed limits are hatched. Before 1818 the southern drainage extends beyond the later 49th-parallel border.','The 1840/1841 digital view shows the union effective in 1841; Oregon is jointly occupied and the northeastern frontier unsettled.','Before 1600 uses border-free geographic context and does not invent Indigenous nation polygons.','Reference context: https://www.canada.ca/en/canadian-heritage/services/provincial-territorial-symbols-canada/nova-scotia.html','Labrador administration: https://www.gov.nl.ca/education/files/k12_curriculum_documents_socialstudies_2010_nls2205-09ch4pp285-381.pdf'],'feature_counts':{k:len(v['features']) for k,v in maps.items()}}
(ROOT/'colonial-digitization.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
print('Built',records['feature_counts'],'gzip bytes',(ROOT/'colonial-boundaries.json.gz').stat().st_size)
