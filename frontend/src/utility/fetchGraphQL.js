// your-app-name/src/fetchGraphQL.js
async function fetchGraphQL(text: string) {
   
    // Fetch data from GitHub's GraphQL API:
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: text,
        
      }),
    });
  
    // Get the response as JSON
    return await response.json();
  }
  export default fetchGraphQL;