import { useEffect, useState } from "react";
import ResponseHandler from "./ResponseHandler";

type SonarResponse = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
};

type fileText = {
  fileText: string | null;
};

const SONAR_API_URL = "https://api.perplexity.ai/chat/completions";
const API_KEY = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;

type UploadStatus = "idle" | "uploading" | "success" | "error";

//api call to get the json response
export default function FileConsumer({ fileText }: fileText) {
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");

  const promptSonar = async (fileText: string) => {
    setStatus("uploading");
    const body = {
      model: "sonar-pro", // or "sonar" for the base model
      messages: [
        {
          role: "system",
          content:
            "Extract key terms and definitions from the text. Return only JSON.",
        },
        {
          role: "user",
          content: `Extract key terms with definitions from this text: ${fileText}`,
        },
      ],
      max_tokens: 512,
      temperature: 0.2,
    };

    try {
      const res = await fetch(SONAR_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data: SonarResponse = await res.json();
      setResponse(data.choices[0]?.message.content || "No response");
      setStatus("success");
    } catch (error) {
      setResponse(`Error: ${(error as Error).message}`);
      setStatus("error");
    }
  };

  // const geoTerms =
  //   '[{"term":"Axis of rotation","definition":"An imaginary line around which Earth rotates, defining the locations of the North and South Poles and the equator halfway between them.[6][8][10]"},{"term":"North Pole","definition":"The point where Earth\'s axis of rotation intersects the surface in the Northern Hemisphere; defined as 90° north latitude.[6][8][10]"},{"term":"South Pole","definition":"The point where Earth\'s axis of rotation intersects the surface in the Southern Hemisphere; defined as 90° south latitude.[6][8][10]"},{"term":"Equator","definition":"An imaginary great circle on Earth\'s surface, equidistant from the North and South Poles, dividing the planet into Northern and Southern Hemispheres; defined as 0° latitude.[6][8][10]"},{"term":"East","definition":"The direction toward which Earth rotates.[6][8][10]"},{"term":"West","definition":"The direction opposite to Earth\'s rotation.[6][8][10]"},{"term":"Great circle","definition":"Any circle drawn on the surface of a sphere whose center coincides with the center of the sphere; the equator and all meridians are examples on Earth.[6][8][10]"},{"term":"Meridian","definition":"A great circle passing through both the North and South Poles; used to specify east-west locations (longitude) on Earth.[6][8][10]"},{"term":"Longitude","definition":"The angular distance east or west on Earth\'s surface, measured along the equator from the Prime Meridian; specifies east-west location.[6][8][10]"},{"term":"Prime Meridian","definition":"The meridian designated as 0° longitude, passing through Greenwich, England, by international agreement.[6][8][10]"},{"term":"Coordinate system","definition":"A system for defining the location of points on Earth\'s surface, often using latitude and longitude as coordinates.[6][8][10]"}]';

  useEffect(() => {
    if (fileText) {
      //setResponse(geoTerms);
      promptSonar(fileText);
    }
  }, [fileText]);

  return (
    <>
      <div>
        {status === "uploading" && <p>uploading</p>}
        {status === "error" && <p>error</p>}
      </div>
      <div>
        {response && <ResponseHandler response={response}></ResponseHandler>}
      </div>
    </>
  );
}
