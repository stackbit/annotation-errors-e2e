import * as React from 'react';
import { StackbitObjectId, getObjectId, toFieldPath } from '@stackbit/annotations';
import { Header as HeaderModel } from 'types';

import MuiAppBar from '@mui/material/AppBar';
import MuiBox from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';

import { Link } from '../../atoms/Link';

export type Props = HeaderModel & StackbitObjectId;

export const Header: React.FC<Props> = (props) => {
    const { title, navLinks = [] } = props;
    const objectId = getObjectId(props);
    const fieldPath = objectId ? `${objectId}:header` : null;
    return (
        <MuiAppBar position="static" color="transparent" elevation={0} {...toFieldPath(fieldPath)}>
            <MuiToolbar disableGutters={true} sx={{ flexWrap: 'wrap' }}>
                {title && (
                    <MuiBox sx={{ mb: 1, mr: 2, flexGrow: 1 }}>
                        <MuiTypography component="p" variant="h6" color="text.primary" noWrap>
                            {title}
                        </MuiTypography>
                    </MuiBox>
                )}
                {navLinks.length > 0 && (
                    <MuiBox component="nav" sx={{ display: 'flex', flexWrap: 'wrap' }} {...toFieldPath('.navLinks')}>
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                {...link}
                                {...toFieldPath(`.${index}`)}
                                sx={{
                                    ...(index !== navLinks.length - 1 && { mr: 2 }),
                                    mb: 1
                                }}
                            />
                        ))}
                    </MuiBox>
                )}
            </MuiToolbar>
        </MuiAppBar>
    );
};
