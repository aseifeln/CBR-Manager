import React,{useEffect} from 'react';

function NotFoundPage() {
  useEffect(() => {
    document.title="Not Found 404"
  }, [])
  return (
    <h1>Not Found!</h1>
  )
}

export default NotFoundPage;