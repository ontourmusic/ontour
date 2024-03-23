import React from 'react'

const CommentBox1 = ({comments}) => {
    console.log(comments)
  return (
    <div style={{ maxHeight: '300px', overflowY: 'auto', color: "black" }}>
   {comments.length === 0 && <p style={{ fontStyle: 'italic', textAlign: 'center', marginTop: '10px', color: "white" }}>Be the first to comment!</p>}
    {comments.map((comment, index) => (
      <div key={index}>
        <div class="card" style={{ margin: '10px' }}>
          <div class="card-body">
            <p class="card-text" style={{ display: 'inline-block', fontWeight: 'bold' }}>
              {comment.name}
            </p>
            <p class="card-text" style={{ display: 'inline-block', fontWeight: 'normal' }}>
              {` \u00A0`}• {comment.date}
            </p>
            <p class="card-text">{comment.comment}</p>
          </div>
        </div>
      </div>
    ))} 
  </div>
  )
}

export default CommentBox1
