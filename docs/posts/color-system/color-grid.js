import React from "react"
import copyToClipboard from "./copy-to-clipboard"
import materialColors from "./material-colors"
import { tailwind } from "@theme-ui/presets"

const ColorGrid = ({ colorsArray }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gridGap: "10px 10px",
      }}
    >
      {colorsArray.map(colors => {
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, 5em)",
              gridTemplateRows: "repeat(auto-fill, 8em)",
              gridColumnGap: "10px",
            }}
            key={colors.title}
          >
            <div
              key={colors.title}
              style={{
                color: "white",
                backgroundColor: colors.default,
                gridRow: "span 2",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {colors.title}
            </div>
            {colors.values
              .filter(item => item.value)
              .map(item => (
                <div
                  key={item.key}
                  onClick={() => copyToClipboard(item.value)}
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      height: "5em",
                      backgroundColor: item.value,
                      textAlign: "center",
                      lineHeight: "5em",
                    }}
                  ></div>
                  {item.key}
                </div>
              ))}
          </div>
        )
      })}
    </div>
  )
}

export const TailwindColorGrid = () => {
  const colorsArray = Object.keys(tailwind.colors)
    .filter(v => Array.isArray(tailwind.colors[v]))
    .map(v => {
      return {
        title: v,
        default: tailwind.colors[v][5],
        values: tailwind.colors[v].map((item, index) => {
          return {
            key: `${v}[${index + 1}]`,
            value: item,
          }
        }),
      }
    })
  return <ColorGrid colorsArray={colorsArray} />
}

export const MaterialColorGrid = () => {
  const colorsArray = Object.keys(materialColors).map(v => {
    return {
      title: v,
      default: materialColors[v][500],
      values: Object.keys(materialColors[v]).map(color => {
        return { key: color, value: materialColors[v][color] }
      }),
    }
  })
  return <ColorGrid colorsArray={colorsArray} />
}
