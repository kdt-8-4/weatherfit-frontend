import axios from "axios";

//현재 최저, 최고온도에 따른 가장 많이쓰인 카테고리 탑5
async function getTop5() {
  try {
    const result = await axios({
      method: "GET",
      url: "https://www.jerneithe.site/category/tops?temp_min=8&temp_max=10",
    });

    console.log(result.data);
  } catch (err) {
    console.log(err);
  }
}
