const LAConstants = {
    dt: 0.001,
    sigma: 10,
    rho: 28,
    beta: 8/3,
}

const scalePropsL = {
    scale: 15,
    locX: window.innerWidth/2,
    locY: window.innerHeight/2,
    globalSize: 2,
}
  
export function Lorenz(x, y, z) {
    let dx = (LAConstants.sigma * (y - x));
    let dy = (x * (LAConstants.rho - z) - y);
    let dz = (x * y - LAConstants.beta * z);

    let newX = x + dx*LAConstants.dt;
    let newY = y + dy*LAConstants.dt;
    let newZ = z + dz*LAConstants.dt;

    let array_name = [newX, newY, newZ, scalePropsL];   

    return array_name
}

const SPConstants = {
    dt: 0.1,
    a: 2.07,
    b: 1.97,
}

const scalePropsSP = {
    scale: 140,
    locX: window.innerWidth/2,
    locY: window.innerHeight/2,
    globalSize: 2,
  }

export function Sprout(x, y, z) {
    let dx = (y + SPConstants.a*x*y + x*z);
    let dy = (1 - SPConstants.b*Math.pow(x, 2) + y*z);
    let dz = (x - Math.pow(x, 2) - Math.pow(y, 2));

    let newX = x + dx*SPConstants.dt;
    let newY = y + dy*SPConstants.dt;
    let newZ = z + dz*SPConstants.dt;

    let array_name = [newX, newY, newZ, scalePropsSP];   

    return array_name
}

const FWConstants = {
    dt: 0.1,
    a: 0.2,
    b: 0.01,
    c: -0.4,
}

const scalePropsFW = {
    scale: 280,
    locX: window.innerWidth/2,
    locY: window.innerHeight/2,
    globalSize: 2,
  }

export function fourWings(x, y, z) {
    let dx = (FWConstants.a*x + y*z);
    let dy = (FWConstants.b*x + FWConstants.c*y - x*z);
    let dz = (-z-x*y);

    let newX = x + dx*FWConstants.dt;
    let newY = y + dy*FWConstants.dt;
    let newZ = z + dz*FWConstants.dt;

    let array_name = [newX, newY, newZ, scalePropsFW];   

    return array_name
}