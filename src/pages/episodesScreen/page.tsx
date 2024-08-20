import { useNavigate, useParams } from "react-router-dom";
import Episodes from "./Episodes";

const EpisodesScreen = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { slug } = params;

  if (!slug) {
    // if slug is not present, return null;
    navigate("/");
    return;
  }

  return <Episodes slug={slug!} />;
};

export default EpisodesScreen;
