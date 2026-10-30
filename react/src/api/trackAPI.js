async function getTracks() {
  const path = "/api/tracks";
  const response = await fetch(path, {
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.tracks;
}

async function deleteTrack(id) {
  const path = "/api/track/delete/" + id;
  const response = await fetch(path, {
    method: "DELETE",
    credentials: "include",
  });

  return response;
}

export default {
  getTracks,
  deleteTrack,
};
