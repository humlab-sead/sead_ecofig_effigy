
import { EcofigEffigy } from './EcofigEffigy.js';

const _ = require('lodash');

class EcofigEffigyFactory {

    create(ecofigs) {
        let groupedEcofigs = _.groupBy(ecofigs, this.groupByKey);
        return groupedEcofigs.keys().map(x => new EcofigEffigy(groupedEcofigs[x]));
    }

    groupByKey() { throw new Error('EcofigEffigyFactory is abstract'); }
}

/*
* Default - just group by site and epoch
*/
class DefaultEcofigEffigyFactory extends EcofigEffigyFactory {

    groupByKey = (x) => `${x.site}/${x.epoch}`;

}

export { DefaultEcofigEffigyFactory };
