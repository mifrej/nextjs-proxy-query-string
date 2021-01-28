import { useEffect, useState } from "react";
import { useAsync } from "react-async";
import queryString from "query-string";

const getCannabis = async () => {
  const response = await fetch(
    // I am stringifying exactly breaking param from object
    // Editor is showing this text as UTF-8
    `/api/cannabis/random_cannabis?${queryString.stringify({
      name: "TT * CON * °C * min15 f"
    })}`
  );
  if (!response.ok) throw new Error(response.status);
  return response.json();
};

// eslint-disable-next-line import/no-default-export
export default function IndexPage() {
  const [cannabis, setCannabis] = useState({});

  const { data, error, isPending } = useAsync({
    promiseFn: getCannabis
  });
  useEffect(() => {
    if (!isPending && data) setCannabis(data);
  }, [data, isPending]);
  return (
    <div>
      {console.log(cannabis)}
      {Object.entries(cannabis).map(([key, value]) => (
        <p key={key}>
          {`${key}`}: <strong>{`${value}`}</strong>
        </p>
      ))}
    </div>
  );
}
