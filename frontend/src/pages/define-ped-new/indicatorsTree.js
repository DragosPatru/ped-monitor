import indicatorsMap from "constants/indicators-map";
import React, { useState } from 'react';
import SimpleTreeView from '@mui/x-tree-view/SimpleTreeView';
import TreeView from '@mui/x-tree-view/TreeView';
import TreeItem from '@mui/material/TreeItem';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const buildTree = (indicators) => {
    const tree = {};
    indicators.forEach((value, key) => {
      const { title, parent } = value;
      if (parent === "NONE") {
        tree[key] = { title, key, children: [] };
      } else {
        if (tree[parent]) {
          tree[parent].children.push({ title, key });
        }
      }
    });
    return tree;
  };
  
  const RenderTree = ({ node }) => {
    const [checked, setChecked] = useState(false);
  
    const handleToggle = () => {
      setChecked(!checked);
    };
  
    return (
      <TreeItem key={node.key} nodeId={node.key} label={<div><Checkbox checked={checked} onChange={handleToggle} />{node.title}</div>}>
        {node.children.map(child => <RenderTree key={child.key} node={child} />)}
      </TreeItem>
    );
  };
  
  const IndicatorTreeView = () => {
    const treeData = buildTree(indicatorsMap);
  
    return (
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
      >
        {Object.values(treeData).map(node => (
          <RenderTree key={node.key} node={node} />
        ))}
      </TreeView>
    );
  };
  
  export default IndicatorTreeView;