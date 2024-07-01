import React from "react";
import { InfinitySpin, TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const MainButton2 = (props) => {
  const navigate = useNavigate();
  return (
    <button
    className="text-gray-800 text-sm font-bold tracking-widest px-6 py-1 border border-gray-800 border-2 hover:border-gray-400 hover:scale-110 transition duration-300 ease-in-out"
      onClick={() => navigate(props.navigation)}
    >
      {props.val}
    </button>
  );
};

const MainButton = (props) => {
  const navigate = useNavigate();

  return (
    <button
      className="text-white font-bold tracking-widest px-6 py-3 border border-white border-2 hover:border-gray-400 hover:scale-110 transition duration-300 ease-in-out"
      onClick={() => navigate(props.navigation)}
    >
      {props.val}
    </button>
  );
};

const BlueButton = (props) => {
  const navigate = useNavigate();

  return (
    <button
      disabled={!!props.loading}
      className="bg-blue-500 text-white rounded-full py-2 px-4 mt-4 hover:bg-blue-600 disabled:opacity-80 inline-flex"
      onClick={() => navigate(props.navigation)}
    >
      {props.loading ? (
        <span className="inline-block px-2">
          <TailSpin width="23" height="23" color="white" />
        </span>
      ) : (
        props.val
      )}
    </button>
  );
};

export { MainButton2, MainButton, BlueButton };
