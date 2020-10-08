import React             from "react";
import Enzyme, { mount } from "enzyme";
import Adapter           from "enzyme-adapter-react-16";
import { SearchBar }     from "./SearchBar";

Enzyme.configure({ adapter: new Adapter() });

describe("Search Component Testing", () => {

  /**
   * Element render tests
   */

  const store = {
    status:  "success",
    search:  [],
    favs:    [],
    filter:  "",
    display: "default",
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SearchBar posts={ store }/>);
  });

  test("Render component", () => {
    expect(wrapper.length)
      .toBe(1);
  });

  test("Render 2 text fields", () => {
    expect(wrapper.find("button"))
      .toHaveLength(2);
  });

  test("Render 2 buttons", () => {
    expect(wrapper.find("button"))
      .toHaveLength(2);
  });

  /**
   * Element interaction tests
   */

  test("Search button disabled state change on input", () => {
    let description = wrapper.find("input")
                             .at(0);
    let location    = wrapper.find("input")
                             .at(1);
    /*
     i wanted to do a button variable
     but for some reason it's state would not update on change
     while the full path call works every time
     ?question mark?
     */
    /**
     * Initial state test
     */
    expect(wrapper.find("button")
                  .at(0)
                  .prop("disabled"))
      .toBe(true);

    /**
     * Stage change on Description input
     */
    description.simulate("change", { target: { value: "js" } });
    expect(wrapper.find("button")
                  .at(0)
                  .prop("disabled"))
      .toBe(false);
    description.simulate("change", { target: { value: "" } });

    /**
     * State change on Location input
     */
    location.simulate("change", { target: { value: "moscow" } });
    expect(wrapper.find("button")
                  .at(0)
                  .prop("disabled"))
      .toBe(false);
    location.simulate("change", { target: { value: "" } });

    /**
     * State change on both Description and Location input
     */
    description.simulate("change", { target: { value: "js" } });
    location.simulate("change", { target: { value: "moscow" } });
    expect(wrapper.find("button")
                  .at(0)
                  .prop("disabled"))
      .toBe(false);
    description.simulate("change", { target: { value: "" } });
    location.simulate("change", { target: { value: "" } });

    /**
     * State reversion to initial on input clear
     */
    expect(wrapper.find("button")
                  .at(0)
                  .prop("disabled"))
      .toBe(true);
  });
});
