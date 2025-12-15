async function getData(url, cre = "omit") {
  try {
    const res = await fetch(url, {
      method: "GET",
      credentials: cre,
    });
    if (!res.ok) {
      throw new Error("Faild fetch");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

async function handleData(url, cre = "omit", method, data) {
  try {
    const res = await fetch(url, {
      method: method,
      credentials: cre,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP Error ${res.status}: ${errorText}`);
    }
    let results = await res.json();
    return results;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
}

export { getData, handleData };
