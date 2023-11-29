export default function LikePost() {
  const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="post_box">
      {posts.map((post, index) => (
        <div key={index} className="post">
          {post}
        </div>
      ))}
    </div>
  );

  // return (
  //   <div className="post_box">
  //     <div className="post">1</div>
  //     <div className="post">2</div>
  //     <div className="post">3</div>
  //     <div className="post">4</div>
  //     <div className="post">5</div>
  //   </div>
  // );
}
