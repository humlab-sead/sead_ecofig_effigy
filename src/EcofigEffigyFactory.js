
import { EcofigEffigy } from './EcofigEffigy.js';

const _ = require('lodash');

class EcofigEffigyFactory {

    create(ecofigs) {
        let groupedEcofigs = _.groupBy(ecofigs, this.groupByKey);
        return Object.keys(groupedEcofigs).map(x => new EcofigEffigy(groupedEcofigs[x], {name: x }));
    }

    groupByKey() { throw new Error('EcofigEffigyFactory is abstract'); }
}

/*
* Default - just group by site and epoch
*/
class DefaultEcofigEffigyFactory extends EcofigEffigyFactory {

    groupByKey(x) { return `${x.site}/${x.epoch}` }

}

const ecofigEffigyFactory = new DefaultEcofigEffigyFactory();

export default ecofigEffigyFactory;
