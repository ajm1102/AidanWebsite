

export function euler(x, y, props) {
    let dt = props.dt
    let dx = eval(props.eqn1)
    let dy = eval(props.eqn2)

    let newX = x + dx*dt
    let newY = y + dy*dt


    return [newX, newY]
}