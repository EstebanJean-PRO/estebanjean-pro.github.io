import '/public/common.css'

export default function DevIcon({ width, height, link, name }) {
    return <img width={width} height={height} src={link} alt={name} title={name} />
}