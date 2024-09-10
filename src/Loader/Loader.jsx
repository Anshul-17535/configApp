import React from 'react'
import styles from "./Loader.module.css"


/**
 * Loader component renders a loading indicator.
 *
 * @param {string} scope - The scope or context of the loading operation (Grid Page or CRUD Action).
 * @returns {JSX.Element} The rendered Loader component.
 */
const Loader = ({scope}) => {
  return (
    <>
    <div className={scope === "grid" ? styles.addLoaderWrapper : styles.loaderWrapper}>
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}>
      </div>
    </div>
    </div>
  </>
  )
}

export default Loader