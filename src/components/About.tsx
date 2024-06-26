import { User } from "./User";

export const About = () => {
  return (
    <div className="flex flex-col gap-2 px-2">
      <p className="text-2xl font-bold">Roarer</p>
      <p>
        Roarer 2+ is a simple and mobile friendly client for{" "}
        <a href="https://meower.org/" className="font-bold text-lime-600">
          Meower
        </a>{" "}
        made by{" "}
        <User username="EngineerRunner">
          <button className="font-bold text-lime-600" type="button">
            engineerrunner
          </button>
        </User>
        .
      </p>
      <p>
        You're using Roarer 2+, which is a new version of Roarer 2 that's currently
        in development. It may be unstable. Please let me know what you think!
        You can access the original version of Roarer{" "}
        <a
          href="https://engineerrunner.github.io/roarer-2/?#/home"
          target="_blank"
          className="font-bold text-lime-600"
        >
          here
        </a>
        .
      </p>
      <div className="flex justify-center text-lg">
        <a
          href="https://github.com/engineerrunner/roarer-2-plus"
          target="_blank"
          className="font-bold text-lime-600"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};
