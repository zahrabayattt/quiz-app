import pluscircle from "../assets/images/plus-circle.png";
import Vector from "../assets/images/Vector.png";
import Container from "./Container";
import Navbar from "./Navbar";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Container>
        <section className="my-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Quiz Dashboard</h2>
          <button className="my-btn flex items-center gap-2 bg-my-primary text-foreground">
            <img className="object-contain" src={pluscircle} alt="pluscircle" />
            New Quiz
          </button>
        </section>
        <div className="flex flex-col rounded-xl border border-foreground-tertiary p-6">
          <section className="flex items-center justify-between">
            <p className="text-foreground-tertiary">John Doe Feb 28 , 2025</p>
            <div className="flex gap-3">
              <button className="flex items-center rounded-2xl bg-white px-4 py-1 text-secondry">
                Publish
              </button>
              <img className="object-contain" src={Vector} alt="Vector" />
            </div>
          </section>
          <hr className="border-0.5 mt-5 mb-3 border-foreground-tertiary"></hr>
          <h3 className="mt-3 mb-5 text-xl font-bold text-foreground">
            What does CSS stand for?
          </h3>
          <section>
            <div className="mb-3 space-x-4">
              <input
                type="checkbox"
                className="checkbox rounded-xl border-3 checkbox-primary"
              />
              <label className="text-foreground">Computer Styling System</label>
            </div>
            <div className="mb-3 space-x-4">
              <input
                type="checkbox"
                className="checkbox rounded-xl border-3 checkbox-primary"
              />
              <label className="text-foreground">Cascading Style Sheets</label>
            </div>
            <div className="mb-3 space-x-4">
              <input
                type="checkbox"
                className="checkbox rounded-xl border-3 checkbox-primary"
              />
              <label className="text-foreground">Creative Sheet Styling</label>
            </div>
            <div className="mb-3 space-x-4">
              <input
                type="checkbox"
                className="checkbox rounded-xl border-3 border-primary checkbox-primary"
              />
              <label className="text-foreground">Code Structure Script</label>
            </div>
          </section>
          <hr className="border-0.5 mt-7 mb-5 border-foreground-tertiary"></hr>
          <div>
            <button className="my-btn-primary my-btn text-foreground">
              Submit answer
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
