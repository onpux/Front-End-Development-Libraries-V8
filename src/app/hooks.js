import { useDispatch, useSelector } from 'react-redux';

// Punto único de importación de los hooks de Redux.
// Si en el futuro se migra a TypeScript, solo este archivo cambia.
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
