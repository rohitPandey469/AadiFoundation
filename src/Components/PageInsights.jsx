import React, { useState, useEffect } from "react";

const PageInsights = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [insights, setInsights] = useState({});
  const [since, setSince] = useState("");
  const [until, setUntil] = useState("");

  useEffect(() => {
    window.FB.api("/me/accounts", function (response) {
      if (response && !response.error) {
        setPages(response.data);
      } else {
        console.error(response.error);
      }
    });
  }, []);

  const handlePageChange = (event) => {
    const selectedPageId = event.target.value;
    const selectedPage = pages.find((page) => page.id === selectedPageId);
    setSelectedPage(selectedPage);
  };

  const fetchPageInsights = () => {
    if (!selectedPage) {
      console.log("No page selected");
      return;
    }

    const { id: pageId, access_token: accessToken } = selectedPage;

    window.FB.api(
      `/${pageId}/insights`,
      "GET",
      {
        access_token: accessToken,
        metric:
          "page_fans,page_engaged_users,page_impressions,page_reactions_by_type_total",
        since,
        until,
        period: "total_over_range",
      },
      function (response) {
        if (response && !response.error) {
          const insightsData = response.data.reduce((acc, item) => {
            acc[item.name] = item.values[0].value;
            return acc;
          }, {});
          setInsights(insightsData);
        } else {
          console.error(response.error);
        }
      }
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: ".5rem",
      }}
    >
      {pages.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "0.5rem",
              color: "grey",
              fontWeight: "600",
            }}
          >
            <label>Select Page </label>
            <select
              style={{ border: "0.2px solid grey", padding: "0.25rem 1rem" }}
              onChange={handlePageChange}
              value={selectedPage?.id || ""}
            >
              <option value="" disabled>
                Select a page
              </option>
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              style={{
                fontWeight: "600",
                color: "grey",
                marginRight: "0.25rem",
              }}
            >
              Since{" "}
            </label>
            <input
              style={{ border: "0.2px solid grey", padding: "0.25rem 1rem" }}
              type="date"
              value={since}
              onChange={(e) => setSince(e.target.value)}
            />
          </div>
          <div>
            <label
              style={{
                fontWeight: "600",
                color: "grey",
                marginRight: "0.25rem",
              }}
            >
              Until{" "}
            </label>
            <input
              style={{ border: "0.2px solid grey", padding: "0.25rem 1rem" }}
              type="date"
              value={until}
              onChange={(e) => setUntil(e.target.value)}
            />
          </div>
          <button
            title="Fetch Pages Insights"
            style={{
              marginTop: "0.25rem",
              padding: "0.8rem 1.2rem",
              border: "None",
              backgroundColor: "ButtonShadow",
              fontWeight: "600",
              borderRadius: ".2rem",
              cursor: "pointer",
              alignSelf: "center",
            }}
            onClick={fetchPageInsights}
          >
            Fetch Page Insights
          </button>

          {selectedPage && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                color: "grey",
              }}
            >
              <h3>Insights for {selectedPage.name}</h3>
              <div>
                <h4>Total Followers / Fans: {insights.page_fans || "N/A"}</h4>
                <h4>
                  Total Engagement: {insights.page_engaged_users || "N/A"}
                </h4>
                <h4>Total Impressions: {insights.page_impressions || "N/A"}</h4>
                <h4>
                  Total Reactions:{" "}
                  {insights.page_reactions_by_type_total || "N/A"}
                </h4>
              </div>
            </div>
          )}
        </>
      ) : (
        <p style={{ color: "red", fontWeight: "600" }}>
          No pages exist for the current user.
        </p>
      )}
    </div>
  );
};

export default PageInsights;
