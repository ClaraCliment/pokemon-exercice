import React from 'react';
import Layout from '../components/Layout';
import Link  from 'next/link';

export default function pokemon( {pokeman} ) {
    console.log(pokeman)
  return (
    <Layout title={pokeman.name}>
      <h1 className="text-4xl mb-2 text-center capitalize">{pokeman.name}</h1>
      <img src={pokeman.image} alt={pokeman.name} className="mx-auto" />
      <p><span className='mr-2 font-bold'>Weight: </span>{pokeman.weight}</p>
      <p><span className='mr-2 font-bold'>Height: </span>{pokeman.height}</p>
      <h2 className='text-2xl mt-6 mb-2'>Types</h2>
      {pokeman.types.map((type, index) => (<p key={index}>{type.type.name}</p>)
      )}
      <p className='mt-10 text-center'>
          <Link href="/">
              <a>
              <button className="px-4 py-2 mb-8 text-center uppercase font-medium bg-slate-900 text-white" >
                    Home
                </button>
              </a>
          </Link>
      </p>
      

    </Layout>
  )
}


export async function getServerSideProps ( {query} ) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await res.json();
        const paddedId = ('00' + (id)).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;
        pokeman.image = image;
        return { 
            props: {pokeman},
        }
    } catch (error) {
        console.log(error);
    }
}