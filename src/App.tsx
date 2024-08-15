import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TreeNode from "./TreeNode";
import ShimmerUI from "./ShimmerUI";

// Define the interface for TreeNode properties
interface TreeNodeProps {
  left?: TreeNodeProps;
  right?: TreeNodeProps;
  result: number[];
  initialArray?: number[];
}

const App: React.FC = () => {
  const [array, setArray] = useState<string[]>([]); // Store user input array
  const [steps, setSteps] = useState<TreeNodeProps[]>([]); // Store steps for merge sort
  const [loading, setLoading] = useState<boolean>(false); // Shimmer effect

  // Handle input field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value.split(",").map((val) => val.trim());
    setArray(values);
  };

  // Validate array, contains only valid numbers
  const isValidArray = (arr: string[]): boolean => {
    // Check every value is a number
    return arr.every((val) => !isNaN(Number(val)) && val !== "");
  };

  // Merge sort function - sorts the array and tracks the sorting steps
  const mergeSort = (arr: number[]): TreeNodeProps => {
    if (arr.length <= 1) return { result: arr }; // Base case: return array if it's already sorted

    const middle = Math.floor(arr.length / 2); // Find middle index to split array

    const left = mergeSort(arr.slice(0, middle)); // Recursively sort the left & right half
    const right = mergeSort(arr.slice(middle));

    // Merge the sorted left and right halves
    const merged = merge(left.result, right.result);
    return { left, right, result: merged, initialArray: arr }; // Return the tree node for visualization
  };

  // Function to merge two sorted arrays into one sorted array
  const merge = (left: number[], right: number[]): number[] => {
    let result: number[] = []; // Array to store merged results
    let leftIndex = 0; // Index for the left array
    let rightIndex = 0; // Index for the right array

    // Merge the two arrays by comparing elements
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    // Concatenate any remaining elements from the left and right arrays
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  // Handle the sorting process when the user clicks the "Submit" button
  const handleSort = () => {
    if (array.length === 0) {
      toast.error("Please enter some numbers to sort!");
      return;
    }

    if (!isValidArray(array)) {
      toast.error(
        "Invalid input! Please enter only numbers separated by commas."
      );
      return;
    }

    setLoading(true);
    setSteps([]); // Reset the steps before starting the sort
    // Perform the merge sort and store the sorting steps
    const sortedTree = mergeSort(array.map(Number));
    setTimeout(() => {
      setSteps([{ initialArray: array.map(Number), ...sortedTree }]);
      setLoading(false);
      toast.success("Array sorted successfully!");
    }, 1000);
  };

  return (
    <section>
      <div className="title">Sort Your Way to Simplicity</div>
      <div className="title2">Input Your Values, Get a Sorted Array!</div>

      <div className="inputTree">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "3rem",
            backgroundColor: "white",
            width: "100%",
            padding: "5px",
            borderRadius: "12px",
            marginTop: "4rem",
          }}
        >
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Enter numbers separated by commas"
          />
          <button onClick={handleSort}>Submit</button>
        </div>

        {/* Show shimmer UI while sorting */}
        {loading && <ShimmerUI />}

        {/* Render the merge sort tree visualization */}
        {!loading && steps.length > 0 && (
          <div className="tree">
            {steps.map((step, index) => (
              <TreeNode key={index} {...step} />
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
    </section>
  );
};

export default App;