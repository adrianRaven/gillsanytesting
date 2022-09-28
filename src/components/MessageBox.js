export default function MessageBox(props) {
  return <div variant={props.variant || "info"}>{props.children}</div>;
}
