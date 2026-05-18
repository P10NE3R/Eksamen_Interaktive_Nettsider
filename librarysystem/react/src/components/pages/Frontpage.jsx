import { useState, useEffect } from 'react';
import client from '../../../helpers/sanityClient';

export default function Frontpage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  //Når denne siden blir loadet, så spørres databasen om ordre og aktive lån for å vise frem to tall
  
  //Spørringen kunne heller bare ha spurt etter de spesifike tallene. 
  // hentet fra https://www.sanity.io/docs/content-lake/query-cheat-sheet


  //Den Alternative løsningen sparer bredbånd og serverkapasitet for der react rammeværket kjører

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const query = `*[_type == "order"]{books}`;
        const result = await client.fetch(query);
        setOrders(result);
        console.log("front page", result)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  //Spørringen disse tallen baserer seg på er ineffektiv. Her er det lurere å stille spørsmål til databasen Så disse 
  
  
  //Teller opp alle aktive ordere
  const activeOrders = orders.length;
  // "activeOrders": count(*[_type == "order"]),

  //Teller opp alle bøker som nå er lånt 
  const booksBorrowed = orders.reduce((count, order) => count + (order.books?.length || 0), 0);
  // "booksBorrowed": sum(*[_type == "order"].count(books)) 
  // På den aktive spørringen så må det kanskje med en dato beregning for å se om orderen er "aktiv" siden det er det som etterspørres
  
  
  
  return (
    <div>
      <h1>Welcome to the Library System</h1>
      <p>Explore our collection of books and manage your library experience.</p>

      <section>
        <h2>Order summary</h2>
        {loading ? (
          <p>Loading order statistics...</p>
        ) : error ? (
          <p>Error loading summary: {error}</p>
        ) : (
          <div>
            <p>Active orders: {activeOrders}</p>
            <p>Books currently borrowed: {booksBorrowed}</p>
          </div>
        )}
      </section>
    </div>
  );
}