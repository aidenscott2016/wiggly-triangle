import { Field, Form, Formik } from "formik";
import { Mapping } from "../../utils/KeyPresser";
import { addKeyMapping, useSettings } from "./SettingsReducer";

type State = {
  map: Mapping[];
};

export const SettingsPane = () => (
  <div>
    <KeyBinds />
    <KeyBinder />
  </div>
);

export const KeyBinds = () => {
  const [{ mappings }] = useSettings();
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>Bound keys</th>
        </tr>
        <tr>
          <th>Key</th>
          <th>Component</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(mappings).map(([k, v], i) => (
          <tr key={i}>
            <td>{k}</td>
            <td>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const KeyBinder = () => {
  const [{ componentsAvailable }, dispatch] = useSettings();

  return (
      <Formik
        initialValues={componentsAvailable}
        onSubmit={(values, ) => {
          console.log(values)
        }}
      >
        <Form>
          <label htmlFor="key">key</label>
          <Field name="key" id="key" placeholder="key" />
          <button type="submit">add</button>
        </Form>
      </Formik>
  );
};

// <Field>
//   {Object.entries(componentsAvailable).map((k, v) => (
//     <option>{k}</option>
//   ))}
// </Field>
