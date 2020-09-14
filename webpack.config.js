const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function generateHtml(htmltemplate) {
    return new HtmlWebpackPlugin({
        filename: `${htmltemplate}.html`,
        template: `./app/${htmltemplate}.html`,
    });
}

const htmlIndex = generateHtml('index');
const htmlLogin = generateHtml('login');
const htmlProfile = generateHtml('profile');
const htmlPanel = generateHtml('panel');
const htmlPropertyList = generateHtml('propertyList');
const htmlOrderList = generateHtml('orderList');
const htmlPropertyDetails = generateHtml('propertyDetails');
const htmlNewVisit = generateHtml('newVisit');
const htmlNewVisitSSO = generateHtml('newVisit_SSO');
const htmlPondProfile = generateHtml('pondProfile');
const htmlPondJobCards = generateHtml('pondJobCards');

module.exports = (env, options) => {

    const devMode = options.mode !== 'production';

    return {

        entry: {
            app: './app/app.js',
        },

        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: devMode ? 'js/[name].js' : 'js/[name].min.js'
        },

        plugins: [
            new CopyPlugin([
                { from: './app/icomoon/fonts', to: 'fonts' },
                { from: './app/images', to: 'images' },
                { from: './app/favicon', to: 'favicon' },
            ]),
            new MiniCssExtractPlugin({
                filename: devMode ? 'css/[name].css' : 'css/[name].min.css',
                chunkFilename: devMode ? 'css/[id].css' : 'css/[id].min.css',
            }),
            new ImageminPlugin({ test: './app/images/**' }),
            new ImageminPlugin({
                //disable: process.env.NODE_ENV !== 'production', // Disable during development
                pngquant: {
                    quality: '65-70'
                }
            })
        ]
            .concat(htmlIndex)
            .concat(htmlLogin)
            .concat(htmlProfile)
            .concat(htmlPanel)
            .concat(htmlPropertyList)
            .concat(htmlOrderList)
            .concat(htmlPropertyDetails)
            .concat(htmlNewVisit)
            .concat(htmlNewVisitSSO)
            .concat(htmlPondProfile)
            .concat(htmlPondJobCards),

        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({}),
                new UglifyJsPlugin(),
            ],
            splitChunks: {
                chunks: 'all',
            }
        },

        module: {
            rules: [
                {
                    test: require.resolve('jquery'),
                    use: [
                        {
                            loader: 'expose-loader',
                            options: 'jQuery',
                        },
                        {
                            loader: 'expose-loader',
                            options: '$',
                        },
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /node-modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use:  [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [

                        //"style-loader",
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: path.resolve(__dirname, 'dist'),
                                hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
                },
                {
                    test: /\.(svg|eot|ttf|woff|woff2)$/,
                    include: [
                        path.resolve(__dirname, 'app/icomoon/fonts'),
                    ],
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            publicPath: path.resolve(__dirname, 'dist/fonts'),
                            name: "fonts/[name].[ext]",
                        }
                    }
                },
                {
                    test: /\.(svg|png|jpg|gif)$/,
                    include: [
                        path.resolve(__dirname, 'app/images'),
                    ],
                    use: {
                        loader: "file-loader",
                        options: {
                            name:'[name].[ext]'
                        }
                    }
                }
            ]
        },

        devtool: 'source-map',
        //devtool: 'cheap-module-eval-source-map',

    }
};

