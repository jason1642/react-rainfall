import { act, fireEvent, render, renderHook } from "@testing-library/react";
import Rain from "../Rain";
import { useRainfall } from "../../../hooks/useRainfall";
import type { RainHandle } from "../rainTypes";

describe("useRainfall", () => {
  it("starts visible, playing, at full intensity", () => {
    const { result } = renderHook(() => useRainfall());
    expect(result.current.props).toEqual({
      playing: true,
      intensity: 1,
      visible: true,
    });
  });

  it("clamps the initial intensity", () => {
    expect(renderHook(() => useRainfall(5)).result.current.intensity).toBe(1);
    expect(renderHook(() => useRainfall(-2)).result.current.intensity).toBe(0);
  });

  it("start and stop toggle playing", () => {
    const { result } = renderHook(() => useRainfall());
    act(() => result.current.stop());
    expect(result.current.playing).toBe(false);
    act(() => result.current.start());
    expect(result.current.playing).toBe(true);
  });

  it("setIntensity updates and clamps the value", () => {
    const { result } = renderHook(() => useRainfall());
    act(() => result.current.setIntensity(0.4));
    expect(result.current.intensity).toBe(0.4);
    act(() => result.current.setIntensity(9));
    expect(result.current.intensity).toBe(1);
  });

  it("hide and show toggle visible", () => {
    const { result } = renderHook(() => useRainfall());
    act(() => result.current.hide());
    expect(result.current.visible).toBe(false);
    act(() => result.current.show());
    expect(result.current.visible).toBe(true);
  });

  it("returns stable callbacks across renders", () => {
    const { result, rerender } = renderHook(() => useRainfall());
    const { start, stop, hide } = result.current;
    rerender();
    expect(result.current.start).toBe(start);
    expect(result.current.stop).toBe(stop);
    expect(result.current.hide).toBe(hide);
  });

  it("forwards calls to the Rain handle when a ref is attached", () => {
    const handle: RainHandle = {
      start: jest.fn(),
      stop: jest.fn(),
      show: jest.fn(),
      hide: jest.fn(),
      setIntensity: jest.fn(),
      triggerLightning: jest.fn(),
    };
    const { result } = renderHook(() => useRainfall());

    // what React does when <Rain ref={rain.ref} /> mounts
    result.current.ref(handle);

    act(() => result.current.stop());
    act(() => result.current.setIntensity(0.5));
    act(() => result.current.triggerLightning());

    expect(handle.stop).toHaveBeenCalled();
    expect(handle.setIntensity).toHaveBeenCalledWith(0.5);
    expect(handle.triggerLightning).toHaveBeenCalled();
  });
});
it("stops forwarding after the ref is detached", () => {
  const handle: RainHandle = {
    start: jest.fn(),
    stop: jest.fn(),
    show: jest.fn(),
    hide: jest.fn(),
    setIntensity: jest.fn(),
    triggerLightning: jest.fn(),
  };
  const { result } = renderHook(() => useRainfall());

  result.current.ref(handle);
  result.current.ref(null);
  act(() => result.current.stop());

  expect(handle.stop).not.toHaveBeenCalled();
  expect(result.current.playing).toBe(false); // hook state still updates
});
describe("useRainfall with <Rain />", () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      value: 600,
    });
  });

  const Harness = () => {
    const rain = useRainfall();
    return (
      <>
        <div data-testid="scene">
          <Rain ref={rain.ref} {...rain.props} numDrops={20} />
        </div>
        <button onClick={rain.stop}>stop</button>
        <button onClick={rain.start}>start</button>
        <button onClick={rain.hide}>hide</button>
        <button onClick={rain.show}>show</button>
      </>
    );
  };

  it("stop adds the stopped class, start removes it", () => {
    const { getByText, getByTestId } = render(<Harness />);
    const container = getByTestId("scene").firstElementChild!;

    fireEvent.click(getByText("stop"));
    expect(container).toHaveClass("rain-container--stopped");

    fireEvent.click(getByText("start"));
    expect(container).not.toHaveClass("rain-container--stopped");
  });

  it("hide removes the droplets and show restores them", () => {
    const { getByText, getByTestId } = render(<Harness />);
    const scene = getByTestId("scene");
    const count = () => scene.getElementsByClassName("rain-drop").length;
    console.log(scene.innerHTML);
    expect(count()).toBe(20);
    fireEvent.click(getByText("hide"));
    expect(count()).toBe(0);
    fireEvent.click(getByText("show"));
    expect(count()).toBe(20);
  });
});
