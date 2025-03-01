export default function Subheading(props) {
  return (
    <h2 className="text-base text-center w-full  text-gray-600">
      {props.children}
    </h2>
  );
}