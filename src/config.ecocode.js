"use strict";
/*
Aquatics
Vatten drop?

Carrion
Halv-rutten ko med lite revben utstickande
 
Disturbed/arable
 - Är detta odlad jord? Ja
 - Symbol: Plöjd åker? – kanske det... inte en traktor eftersom det bör vara lite mer historisk... plog (inspiration here: https://www.google.se/search?client=firefox-b-ab&biw=1280&bih=557&tbm=isch&sa=1&q=plowing+ard&oq=plowing+ard&gs_l=img.3...16457.16944.0.17099.0.0.0.0.0.0.0.0..0.0....0...1c.1.64.img..0.0.0.dHAdTmD3QFI)
S
 
Dung/foul habitats
- Är detta tecken på boskap? – inte nödvändigtvis, kan vara andra betande djur (rådjur, ibex...) men även human poo, rått bajs m.m. Kan också vara äckliga miljöer som avlopsrör, latriner.
- Symbol: Ko? – fungerar bättre på ”Dung”
Kan man rita geggamojs...? Har funderar länge på detta utan mycket framgång...
 
General synanthropic
 - Symbol: En människa
 
Halotolerant
- Symbol: Cyanobacteria in a pile of salt?
Intresant förslag! En mycket svår symbol... saltkristaller om det går att göra dem scalable?
 
Heathland & moorland
 - Symbol: Low rough shrubbery, uncultivated land?
Yep, fast kan vara människor påverkade. Ljung hed (intressanta resurser här http://www.cornucopia3d.com/purchase.php?item_id=3483)
 
Indicators: Coniferous
- Generellt: Vad är skillnaden på en Indicators-kategori mot de andra? – Indicator classes innehåller insekter som är så nära som säker indikatörer på classen som vi kan få. De andra är mindre säker. En insekt kan inte finnas i mer en en indicator class, men kan finnas i flera andra.
- Symbol: pine, fir, spruce, or other cone-bearing trees and shrubs? Or just a cone (kotte)?
Tree is best, as it is more correct for the range of things that could be indicated and less open to interpretation.
 
Indicators: Deciduous
 - Symbol: Tree in autumn colors?
Oak tree, or birch... autumn colours could be nice
 
 - How can an environment be deciduous, isn't that a seasonal property? The environment is dominated by deciduous vegetation – an oak forest, for example. Deciduousness is a property of the tree’s mechanism for coping with seasonal changes.
 
Indicators: Dung
 - Symbol:  A cow (again)?
Ja. (Konflikt med Carrion – jag tror det blir bra om Carrion ko är tydligt död!)
 
Indicators: Running water
 - Symbol: Stream or waterfall?
Stream if possible, rapids or waterfall OK
 
Indicators: Standing water
 - Symbol: Pond/lake?
Yes
 
Meadowland
 - Symbol: Various flowers (& unicorns)?
Yes, especially the unicorns... not
 
Open wet habitats
 - Archipelago-ish environment?
Not really, more of a damp meadow like environment... think of a water meadow, or a recently drained flooded field near the river.
 
Pasture/Dung
 - Fence with (yet more) cows?
Yes, this one emphasises domestic animals, or really the landscape they create (although a herd in Africa can create something similar)
 
Sandy/dry disturbed/arable
 - Pile of sand?
Perhaps similar to arable, but with more open ground... think of dry, recently ploughed fields
 
Stored grain pest
 - Symbol: Beetle + grain?
Grain is enough (beetles are implicit and the proxy for the grain)
 
Wetlands/marshes
 - Symbol: marsh with cigar-plants?
Good idea, is easily recognisable
 
Wood and trees
 - Symbol: Tree(s)​?
​Yes, perhaps a collection of mixed types (some deciduous and some coniferous)?
*/
const __EcoCodes = [
    { id: 'BEco1',  water: true, label: 'Aquatics', definition: 'Living in/on water, in any form. From temporary pools to lakes and rivers.' },
    { id: 'BEco1a', water: true, label: 'Indicators: Standing water', definition: 'Primary habitat in/on pools, ponds, slow flowing water – including temporary ponds, but not species specifically in vegetation and mud or banks of ponds.' },
    { id: 'BEco1b', water: true, label: 'Indicators: Running water', definition: 'Rivers and/or streams. Species predominantly found in these.' },
    { id: 'BEco2',  water: false, label: 'Pasture/Dung', definition: 'Grazed land of varying form. Includes most dung beetles, including those that are not stenotopic to dung. Mostly open landscape, but may include pasture-woodland when in combination with BEco4..' },
    { id: 'BEco3',  water: false, label: 'Meadowland', definition: 'Natural grassland or near equivalents. Open landscape.' },
    { id: 'BEco4',  water: false, label: 'Wood and trees', definition: 'Species tied to either the actual wood, trees or the forest/woodland environment. Generally shade tolerant.' },
    { id: 'BEco4a', water: false, label: 'Indicators: Deciduous', definition: 'Specifically deciduous wood or woodland, species not found on coniferous wood except on rare occasions.' },
    { id: 'BEco4b', water: false, label: 'Indicators: Coniferous', definition: 'Specifically coniferous wood or woodland, species not found on deciduous wood except on rare occasions. BEco5a Wetlands/marshes Water tolerant but not living specifically in the water. May include mud and bank species, as well as those moss & reed dwellers that prefer permanently wet environments.' },
    { id: 'BEco5b', water: true, label: 'Open wet habitats', definition: 'Hydrophilous shade intolerant species, shingle, beaches etc. and other exposed wet environments.' },
    { id: 'BEco6a', water: false, label: 'Disturbed/arable', definition: 'Any disturbed ground surface, be it by animal, geological or human action. Includes ploughed fields, edges of watering holes, farm yards, glacial margins etc.' },
    { id: 'BEco6b', water: false, label: 'Sandy/dry disturbed/arable', definition: 'Similar to the above, but more xerophilous species. Typifies beach, dune and aeolian landscapes, or ploughed fields on more sandy soils. A more dominant environment in southern Europe than BEco6a.' },
    { id: 'BEco7a', water: false, label: 'Dung/foul habitats', definition: 'A wide category for species that live in decaying, muddy and fetid environments, including compost, wet hay, dung and muddy edges of water.' },
    { id: 'BEco7b', water: false, label: 'Carrion', definition: 'Animal carcasses of all forms, dry or wet.' },
    { id: 'BEco7c', water: false, label: 'Indicators: Dung', definition: 'Primary habitat dung, or dung essential for reproduction. Includes parasites of other species that live in dung. Majority of species not found in other environments represented by the broader class BEco7a, but some may be found on occasions outside of dung.' },
    { id: 'BEco8',  water: false, label: 'Mould beetles', definition: 'Large part of the typical indoor synanthropic fauna in northern Europe.' },
    { id: 'BEco9a', water: false, label: 'General synanthropic', definition: 'In association with humans, either when outside of their ‘natural’ geographical range, or in all known records. This term may be geographically specific, and is used in a north European context here.' },
    { id: 'BEco9b', water: false, label: 'Stored grain pest', definition: 'Pests of stored products.' },
    { id: 'BEco10', water: false, label: 'Dry dead wood', definition: 'Wood in constructions, but also similar natural environments such as large fallen trees, especially in warmer climates.' },
    { id: 'BEco12', water: false, label: 'Heathland & moorland', definition: 'Heathland and moorland, but may also indicate the under-story of a Boreal forest (see Finnish example in Chapter 6).' },
    { id: 'BEco13', water: false, label: 'Halotolerant', definition: 'Salt tolerant, often coastal or salt marsh tied, but not just NaCl – can be species found on mineral rich ploughed soils or where mineral precipitation is prominent. Ecto Ectoparasites* External parasites of humans and animals. ' },
    { id: 'BEco99', water: false, label: 'Wetlands/marshes', definition: 'Not found in Phil\'s thesis. ' }
];

const ecoCode = {
    values: __EcoCodes,
    ecoCodeMap:new Map(__EcoCodes.map(x => [x.id, x])),
    ecoCodeLabelMap: new Map(__EcoCodes.map(x => [x.label, x]))
}
export default ecoCode;
