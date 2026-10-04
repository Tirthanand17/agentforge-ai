from fastapi.testclient import TestClient

from services.api.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_agent_run_returns_citations():
    response = client.post(
        "/agents/run",
        json={"input": "How should an agent use MCP tools safely?"},
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload["agents"] == ["Planner", "Retriever", "Analyst", "Reviewer"]
    assert payload["citations"]
    assert payload["evaluation"]["safety"] >= 0.9
