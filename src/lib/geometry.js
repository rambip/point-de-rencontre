const R_TERRE = 6.34e6;

// spherical to cartesian
function s2c(p0, [lat, lng]) {
    const dlat=(lat-p0[0])*(6.2831/360);
    const dlng=(lng-p0[1])*(6.2831/360);
    const y=dlat*R_TERRE;
    const x=dlng*Math.cos(p0[0]*6.2831/360)*R_TERRE;
    return [x, y];
}

// cartesian to spherical
function c2s(p0, [x, y]) {
    const dlng = x/Math.cos(p0[0]*6.2831/360)/R_TERRE;
    const dlat = y/R_TERRE;
    return [p0[0]+dlat/6.2831*360, p0[1]+dlng/6.2831*360];
}

async function dist_time(ors, [lat1, lng1], [lat2, lng2]) {
    try {
        let response = await ors.calculate({
        coordinates: [[lng1, lat1], [lng2, lat2]],
        radiuses:[3000, 3000],
        profile: 'driving-car',
        extra_info: ['waytype', 'steepness'],
        //avoidables: ['highways', 'tollways', 'ferries', 'fords'],
        format: 'json'
      })
      return response.routes[0].segments[0].duration
    }
    catch(err){
        console.log("An error occurred: " + err.status)
        console.error(await err.response.json())
    }
}

function barycenter(points, weights) {
    let weighted = points.map(([x, y], i)=>[x*weights[i], y*weights[i]]);
    return weighted.reduce(([x1, y1], [x2, y2])=>[x1+x2, y1+y2])
}

async function distancesToTarget(ors, target, points){
    let res = [];
    for (let p of points) {
        res.push(await dist_time(ors, p, target))
    }
    return res
}

async function geometricMedian(ors, p0, points){
    var r = p0;
    for (let i=0; i<3; i++){
        const scores = (await distancesToTarget(ors, r, points)).map(x=>1/x);
        const s = scores.reduce((a,b)=>a+b);
        let b = barycenter(points.map(x => s2c(p0, x)), scores);
        r = c2s(p0, [b[0]/s, b[1]/s]);
    }
    return r;
}

export default geometricMedian
