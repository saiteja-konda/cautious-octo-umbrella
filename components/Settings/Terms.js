import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { useStoreActions, useStoreState } from "easy-peasy";

function Terms() {
  const { site } = useStoreState((state) => state.vox);
  const { siteUpdate } = useStoreActions((state) => state.vox);
  const [value, setValue] = useState(site.aboutus);

  const handleContentChange = (value) => {
    setValue(value);
  };
  const handleSubmit = () => {
    siteUpdate({ ...site, termsAndConditions: value });
  };
  return (
    <div className="container">
      <Typography variant="subtitle1" color="primary" className="mt-2 mb-2">
        Terms and Conditions
      </Typography>
      <SunEditor
        onChange={handleContentChange}
        value={value}
        defaultValue={site.termsAndConditions}
        setOptions={{
          height: 200,
          buttonList: [
            ["font", "fontSize", "formatBlock"],
            ["bold", "underline", "italic", "strike", "link"],
            ["undo", "redo"],
            ["fontColor", "hiliteColor"],
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "table"],
          ],
        }}
      />

      <div className="container-lg">
        <Button
          variant="contained"
          color="primary"
          className="mt-5"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Terms;
