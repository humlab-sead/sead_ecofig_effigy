"use strict";

const __EcoCodes = [
    { ecoCode: 'BEco1',  label: 'Aquatics', definition: 'Living in/on water, in any form. From temporary pools to lakes and rivers.' },
    { ecoCode: 'BEco1a', label: 'Indicators: Standing water', definition: 'Primary habitat in/on pools, ponds, slow flowing water – including temporary ponds, but not species specifically in vegetation and mud or banks of ponds.' },
    { ecoCode: 'BEco1b', label: 'Indicators: Running water', definition: 'Rivers and/or streams. Species predominantly found in these.' },
    { ecoCode: 'BEco2',  label: 'Pasture/Dung', definition: 'Grazed land of varying form. Includes most dung beetles, including those that are not stenotopic to dung. Mostly open landscape, but may include pasture-woodland when in combination with BEco4..' },
    { ecoCode: 'BEco3',  label: 'Meadowland', definition: 'Natural grassland or near equivalents. Open landscape.' },
    { ecoCode: 'BEco4',  label: 'Wood and trees', definition: 'Species tied to either the actual wood, trees or the forest/woodland environment. Generally shade tolerant.' },
    { ecoCode: 'BEco4a', label: 'Indicators: Deciduous', definition: 'Specifically deciduous wood or woodland, species not found on coniferous wood except on rare occasions.' },
    { ecoCode: 'BEco4b', label: 'Indicators: Coniferous', definition: 'Specifically coniferous wood or woodland, species not found on deciduous wood except on rare occasions. BEco5a Wetlands/marshes Water tolerant but not living specifically in the water. May include mud and bank species, as well as those moss & reed dwellers that prefer permanently wet environments.' },
    { ecoCode: 'BEco5b', label: 'Open wet habitats', definition: 'Hydrophilous shade intolerant species, shingle, beaches etc. and other exposed wet environments.' },
    { ecoCode: 'BEco6a', label: 'Disturbed/arable', definition: 'Any disturbed ground surface, be it by animal, geological or human action. Includes ploughed fields, edges of watering holes, farm yards, glacial margins etc.' },
    { ecoCode: 'BEco6b', label: 'Sandy/dry disturbed/arable', definition: 'Similar to the above, but more xerophilous species. Typifies beach, dune and aeolian landscapes, or ploughed fields on more sandy soils. A more dominant environment in southern Europe than BEco6a.' },
    { ecoCode: 'BEco7a', label: 'Dung/foul habitats', definition: 'A wide category for species that live in decaying, muddy and fetid environments, including compost, wet hay, dung and muddy edges of water.' },
    { ecoCode: 'BEco7b', label: 'Carrion', definition: 'Animal carcasses of all forms, dry or wet.' },
    { ecoCode: 'BEco7c', label: 'Indicators: Dung', definition: 'Primary habitat dung, or dung essential for reproduction. Includes parasites of other species that live in dung. Majority of species not found in other environments represented by the broader class BEco7a, but some may be found on occasions outside of dung.' },
    { ecoCode: 'BEco8',  label: 'Mould beetles of all types', definition: 'Large part of the typical indoor synanthropic fauna in northern Europe.' },
    { ecoCode: 'BEco9a', label: 'General synanthropic', definition: 'In association with humans, either when outside of their ‘natural’ geographical range, or in all known records. This term may be geographically specific, and is used in a north European context here.' },
    { ecoCode: 'BEco9b', label: 'Stored grain pest', definition: 'Pests of stored products.' },
    { ecoCode: 'BEco10', label: 'Dry dead wood', definition: 'Wood in constructions, but also similar natural environments such as large fallen trees, especially in warmer climates.' },
    { ecoCode: 'BEco12', label: 'Heathland & moorland', definition: 'Heathland and moorland, but may also indicate the under-story of a Boreal forest (see Finnish example in Chapter 6).' },
    { ecoCode: 'BEco13', label: 'Halotolerant', definition: 'Salt tolerant, often coastal or salt marsh tied, but not just NaCl – can be species found on mineral rich ploughed soils or where mineral precipitation is prominent. Ecto Ectoparasites* External parasites of humans and animals. ' },
    { ecoCode: 'BEco99', label: 'Wetlands/marshes', definition: 'Not found in Phil\'s thesis. ' }
];

const ecoCode = {
    values: __EcoCodes,
    ecoCodeMap:new Map(__EcoCodes.map(x => [x.EcoCode, x])),
    ecoCodeLabelMap: new Map(__EcoCodes.map(x => [x.Label, x]))
}
export default ecoCode;
