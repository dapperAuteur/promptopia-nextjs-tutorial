"use client"

import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../utils/serverCall';
// import utilStyles from './../../styles/utils.module.css';

const queryRandomVerbo = `
  findRandomVerbos(limit: 2){
    verbos{
      _id
      spanish
      english
      reflexive
      irregular
      cambiar_de_irregular
      categoria_de_irregular
      terminacion
      grupo
      
    }
  }
`

export default function RandomVerbo() {

  const [showDetails, setShowDetails] = useState({
    english: false,
    grupo: false,
    terminacion: false,
    reflexive: false,
    irregular: false,
    cambiar_de_irregular: false,
    categoria_de_irregular: false,
  });

  const toggleDetail = (key) => {
    setShowDetails((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  
  const {data, error, isLoading} = useSWR('{findRandomVerbos(limit: 2){ verbos{ _id, spanish, english, reflexive, irregular, cambiar_de_irregular, categoria_de_irregular, terminacion, grupo }}}', fetcher)

  if (error) {
    return <div>Failed to load</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return null
  }
  // console.log('data :>> ', data);

  const { findRandomVerbos } = data;

  // console.log('findRandomVerbos :>> ', findRandomVerbos);

  const { verbos } = findRandomVerbos;

  const [verbo0, verbo1] = [...verbos];

  /*
  * Add styling for REFLEXIVE, IRREGULAR, cambiar_de_irregular, categoria_de_irregular, grupo, and terminar
  */

  return (
    <div className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800">
        {verbo0.spanish}
      </h2>
      <h3 className="text-base md:text-lg text-center text-gray-600 mt-2">
        {showDetails.english ? verbo0.english : 'Tap to reveal English'}
      </h3>
      <button
        className="block mx-auto mt-3 px-4 py-2 bg-blue-500 text-white text-sm md:text-base rounded hover:bg-blue-600"
        onClick={() => toggleDetail('english')}
      >
        {showDetails.english ? 'Hide English' : 'Show English'}
      </button>

      <div className="mt-4 space-y-3">
        {['grupo', 'terminacion', 'reflexive', 'irregular', 'cambiar_de_irregular', 'categoria_de_irregular'].map(
          (key) => (
            <div key={key} className="text-gray-700 text-sm md:text-base">
              <span className="font-semibold capitalize">{key.replace('_', ' ')}:</span>{' '}
              {showDetails[key] ? (
                <span>{verbo0[key] ? verbo0[key].toString() : 'N/A'}</span>
              ) : (
                <span className="italic text-gray-500">Hidden</span>
              )}
              <button
                className="ml-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs md:text-sm"
                onClick={() => toggleDetail(key)}
              >
                {showDetails[key] ? 'Hide' : 'Show'}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}