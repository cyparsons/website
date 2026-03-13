import "./index.css";
import { Composition } from "remotion";
import { ProductDemo } from "./ProductDemo";
import { LoginScene } from "./scenes/LoginScene";
import { UploadComparisonScene } from "./scenes/UploadComparisonScene";
import { UploadCOIScene } from "./scenes/UploadCOIScene";
import { ComparisonScene } from "./scenes/ComparisonScene";

const FPS = 30;

// Total duration: 6 + 6 + 6 + 14 = 32s, minus 3 transitions * 0.5s = 30.5s
const TOTAL_DURATION = Math.round(30.5 * FPS);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full demo video */}
      <Composition
        id="ProductDemo"
        component={ProductDemo}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Individual scenes for preview / iteration */}
      <Composition
        id="LoginScene"
        component={LoginScene}
        durationInFrames={Math.round(6 * FPS)}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="UploadComparison"
        component={UploadComparisonScene}
        durationInFrames={Math.round(6 * FPS)}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="UploadCOI"
        component={UploadCOIScene}
        durationInFrames={Math.round(6 * FPS)}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="ComparisonScene"
        component={ComparisonScene}
        durationInFrames={Math.round(14 * FPS)}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
