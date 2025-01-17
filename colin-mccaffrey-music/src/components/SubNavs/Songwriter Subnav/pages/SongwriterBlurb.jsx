import React, { useState, useEffect } from "react";
import { PortableText } from '@portabletext/react';
import { client } from '../../../../sanity/client';

function SongwriterBlurb() {
    const [blurbData, setBlurbData] = useState("");

        useEffect(() => {
            const fetchBlurb = async () => {
                const data = await client.fetch(`*[_type == 'songwriter'][0]{blurb}`);
            
            if (data) {
                setBlurbData(data);
            };
        };

            fetchBlurb();
        }, []);

        if (!blurbData.blurb) {
            return <div></div>
        }
    return (
    <div>
       <h2>{blurbData.blurb.blurbHeader}</h2> 
        <PortableText value={blurbData.blurb.blurbText}
        />
    </div>
  )
}

export default SongwriterBlurb
