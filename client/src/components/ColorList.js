import React, { useState } from "react";
import axiosWithAuth from '../helpers/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const cancel = e => {
    e.preventDefault();
    setEditing(false);
    setColorToEdit(initialColor);
  }

  const saveEdit = e => {
    if (editing) {
      e.preventDefault();
      axiosWithAuth()
        .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
        .then(res => {
          setEditing(false);
          setColorToEdit(initialColor);
          const newColors = colors.map(color => color.id === res.data.id ? res.data : color);
          updateColors(newColors);
        })
        .catch(err => {
          alert(err.message);
        });
    } else {
      e.preventDefault();
      axiosWithAuth()
        .post(`/api/colors`, colorToEdit)
        .then(res => {
          setColorToEdit(initialColor);
          const newColors = res.data;
          updateColors(newColors);
        })
        .catch(err => {
          alert(err.message);
        });
    }
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        const newColors = colors.filter(color => color.id !== res.data);
        updateColors(newColors);
      })
      .catch(err => {
        alert(err.message);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              <span onClick={() => editColor(color)}>{color.color}</span>
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <form>
        <legend>{editing ? 'edit' : 'add'} color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToEdit({ ...colorToEdit, color: e.target.value })
            }
            value={colorToEdit.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
            value={colorToEdit.code.hex}
          />
        </label>
        <div className="button-row">
          <button onClick={saveEdit} type="submit">save</button>
          <button onClick={cancel}>cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
