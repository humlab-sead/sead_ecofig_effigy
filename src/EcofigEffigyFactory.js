
import { EcofigEffigy } from './EcofigEffigy.js';

const _ = require('lodash');

class EcofigEffigyFactory {

    create(ecofigs) {
        let groupedEcofigs = _.groupBy(ecofigs, this.groupByKey);
        return Object.keys(groupedEcofigs).map(x => new EcofigEffigy(groupedEcofigs[x], { name: x }));
    }

    groupByKey() { throw new Error('EcofigEffigyFactory is abstract'); }
}

/*
* Default - just group by siteName and time???
*/
class DefaultEcofigEffigyFactory extends EcofigEffigyFactory {

    // FIXME: Is this enough? Also group by prximity???
    groupByKey(x) { return `${x.siteName}` }

}

const ecofigEffigyFactory = new DefaultEcofigEffigyFactory();

export default ecofigEffigyFactory;
