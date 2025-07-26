import React, { useState } from "react";

export default function Demo() {
    const [num, setNum] = useState(0);

    return (
        <>
            <h1 style={{ textAlign: 'center', marginTop: '25%' }}>
                React is verified successfully.
                <br />
                <button onClick={() => setNum(num + 1)} style={{ border: '1px solid red', borderRadius: '8px', cursor: 'pointer', margin: '16px auto', padding: '10px 20px', fontSize: '16px' }}>
                    You test it {num} times.
                </button>
            </h1>

        </>
    );
}
