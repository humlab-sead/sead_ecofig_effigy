

class GeoMidPointCalculator {

    midpoint (c1, c2) {
        let p1 = c1.map(x => x * Math.PI / 180);
        let p2 = c2.map(x => x * Math.PI / 180);
        let dlng = p2[0] - p1[0];
        let Bx = Math.cos(p2[1]) * Math.cos(dlng);
        let By = Math.cos(p2[1]) * Math.sin(dlng);
        let lat3 = Math.atan2(Math.sin(p1[1]) + Math.sin(p2[1]),
        Math.sqrt((Math.cos(p1[1]) + Bx) * (Math.cos(p1[1]) + Bx) + By * By ));
        let lng3 = p1[0] + Math.atan2(By, (Math.cos(p1[1]) + Bx));
        return [lng3, lat3].map(x => (x*180)/Math.PI);
    }
}

class SimpleMidPointCalculator {

    middleOf = (a, b) => a + (b - a) / 2;

    midpoint (c1, c2) {
        return [ this.middleOf(c1[0], c2[0]), this.middleOf(c1[1], c2[1])];
    }
}

export { GeoMidPointCalculator, SimpleMidPointCalculator };