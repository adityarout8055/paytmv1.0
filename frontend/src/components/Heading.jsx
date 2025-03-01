export default function Heading(props) {
  return (
    <h1 className="text-xl font-bold text-center w-full">
      {props.children}
    </h1>
  );
}