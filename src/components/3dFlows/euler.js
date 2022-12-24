

export function euler(x, y, z, props) {
    let dt = props.dt
    let dx = eval(props.eqn1)
    let dy = eval(props.eqn2)
    let dz = eval(props.eqn3)


    let newX = x + dx*dt
    let newY = y + dy*dt
    let newZ = z + dz*dt

    return [newX, newY, newZ]

    
}