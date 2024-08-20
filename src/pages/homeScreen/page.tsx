import Layout from "../../components/Layout";
import Shows from "./Shows";

const HomeScreen = () => {
  return (
    <Layout>
      <div>
        <div>
          <h1 className="text-primary text-5xl lg:text-7xl xl:text-9xl font-semibold">
            Sochcast
          </h1>
          {/* dummy text */}
          <p className="text-xl lg:text-2xl xl:text-3xl mb-3">
            Discover the Magic of Stories with Every Sound
          </p>
        </div>
        <div>
          {/* dummy text */}
          <p className="text-base lg:text-lg text-gray-500">
            Welcome to our Sound Cast Audio Storybooks Library, where the joy of
            reading meets the power of sound. Immerse yourself in a world of
            captivating tales, brought to life through rich audio experiences
            that ignite the imagination.
          </p>
        </div>
      </div>
      <div className="my-4">
        <button className="bg-primary shadow-md px-4 py-2 rounded-md border hover:border-gray-500 duration-150">
          Explore Shows
        </button>
      </div>

      <Shows />
    </Layout>
  );
};

export default HomeScreen;
