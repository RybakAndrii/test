import { Suspense } from "react";

export async function getServerSideProps(context) {
  const { makeId, year } = context.params;
  const API_URL = process.env.NEXT_PUBLIC_API_URL; // Use environment variable

  try {
    const res = await fetch(
      `${API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    const data = await res.json();

    return {
      props: {
        models: data.Results || [],
        makeId,
        year,
      },
    };
  } catch (error) {
    console.error("Error fetching vehicle models:", error);
    return {
      props: {
        models: [],
        makeId,
        year,
      },
    };
  }
}

export default function ResultPage({ models, makeId, year }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Vehicle Models for {makeId} ({year})
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <Suspense fallback={<div>Loading...</div>}>
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Models
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {models.length > 0 ? (
                models.map((model) => (
                  <div
                    key={model.Model_ID}
                    className="bg-gray-200 rounded-lg p-4"
                  >
                    <h3 className="text-lg font-bold">{model.Model_Name}</h3>
                    <p className="text-sm text-gray-600">
                      Model ID: {model.Model_ID}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No models found for this selection.</p>
              )}
            </div>
          </section>
        </Suspense>
      </main>
    </div>
  );
}
