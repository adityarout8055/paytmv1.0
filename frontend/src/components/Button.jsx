
export default function Button(props) {
  return (
    <button
      className="bg-gray-900 text-white py-1 px-2 rounded w-full mt-5 hover:bg-gray-700 cursor-pointer"
      {...props}
    >
      {props.children}
    </button>
  );
}