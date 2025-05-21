import React from "react";
import styles from "../styles/MoreDropdown.module.css";
import Dropdown from "react-bootstrap/Dropdown";

//  NOTE The forwardRef is important!!
//  NOTE Dropdown needs access to the DOM node in order to position the Menu

// STEP 1 - Renamed component to 'ThreeDots'
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  // STEP Step 2 - Changed element from <a> to <i> tag with font-awesome icon
  <i
    className="fas fa-ellipsis-v"
    // STEP 3 - Preserved ref functionality for Bootstrap compatibility
    ref={ref}
    // STEP Step 4 - Kept the same onClick logic for dropdown behavior
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="fas fa-edit" />
        </Dropdown.Item>

        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className="fas fa-trash-alt" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
